using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Entities.Notifications;
using Scrapbook.Domain.Enums.NotificationTypeEnum;
using Scrapbook.Host.Controllers.Notifications.Dtos;
using Scrapbook.Host.Services.User;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Notifications
{
    public class NotificationController : UserBaseController<Notification>
    {
        private readonly IUserService _userService;
        private readonly DbSet<EditorDocument> _editorDocumentRepository;

        public NotificationController(DefaultContext context, IJwtReader jwtReader, IUserService userService, IMapper mapper = null) : base(context, context.Notifications, jwtReader, mapper)
        {
            _userService = userService;
            _editorDocumentRepository = context.Documents;
        }

        [HttpPost("/Notification")]
        public async Task SendNotification([FromBody] NotificationInput input)
        {
            var userWhichAltered = await _userService.GetUserById(JwtReader.GetUserId());
            
            var documentTitle = "";
            var documentToNotifyAbout = await _editorDocumentRepository.FirstOrDefaultAsync(d => d.Id == input.DocumentId);
            if (documentToNotifyAbout != null)
            {
                input.UserId = documentToNotifyAbout.UserId;
                documentTitle = documentToNotifyAbout.Title;
            }
            var linkId = ""; 
            var message = "";
            switch (input.NotificationType)
            {
                case NotificationTypeEnum.Follow:
                    message = userWhichAltered.FirstName + " está te seguindo";
                    linkId = "/user/profile/"+input.UserId;
                    break;

                case NotificationTypeEnum.Like:
                    message = userWhichAltered.FirstName +  " curtiu o seu componente do documento \""  + documentTitle + "\"";
                    linkId = "/document/"+input.DocumentId;
                    break;
                case NotificationTypeEnum.Dislike:
                    message = userWhichAltered.FirstName +  " deu dislike em seu componente do documento \""+ documentTitle + "\"";
                    linkId = "/document/"+input.DocumentId;
                    break;
                case NotificationTypeEnum.Comment:
                    message = userWhichAltered.FirstName + " comentou em seu componente do documento \"" + documentTitle + "\"";
                    linkId = "/document/"+input.DocumentId;
                    break;
                case NotificationTypeEnum.Love:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            await Repository.AddAsync(new Notification
            {
                UserId = input.UserId,
                WasRead = false,
                Message = message,
                NotificationType = input.NotificationType,
                LinkId = linkId
            });

            await Context.SaveChangesAsync();
        }

        [HttpPost("/notification/read")]
        public async Task ReadNotification()
        {
            var userId = JwtReader.GetUserId();
            var notifications = await Repository.Where(c =>
                c.UserId == userId && c.WasRead == false).ToListAsync();

            foreach (var notification in notifications)
            {
                notification.WasRead = true;
                Repository.Update(notification);
            }
            await Context.SaveChangesAsync();
        }
        
        [HttpGet("/Notification")]
        public async Task<List<Notification>> FindNotifications()
        {
            var userId = JwtReader.GetUserId();
            return await Repository
                .Where(c => c.UserId == userId)
                .OrderBy(x => x.WasRead)
                .ToListAsync();
        }    
    }
}