using System;
using AutoMapper;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Entities.User;
using Scrapbook.Host.Controllers.Document.Dtos;
using Scrapbook.Host.Controllers.UserPreferences;

namespace Scrapbook.Host.Configuration.AutoMapper
{
    public class BaseAutoMapper: Profile
    {
        public BaseAutoMapper()
        {
            CreateDocumentMap();
            CreateUserPreferencesMap();
        }

        private void CreateDocumentMap()
        {
            CreateMap<DocumentCreateOrUpdateInput, EditorDocument>();
            CreateMap<EditorDocument, MyEditorDocument>();
        }

        private void CreateUserPreferencesMap()
        {
            CreateMap<UserPreferenceInput, UserPreference>();
            CreateMap<UserPreference, UserPreferenceOutput>();
        }
    }
}