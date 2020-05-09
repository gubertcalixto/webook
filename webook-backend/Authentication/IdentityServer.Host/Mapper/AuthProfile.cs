using System;
using AutoMapper;
using IdentityServer.Domain.Entities;
using IdentityServer.IdentityControllers.Account.Dtos.Register;

namespace IdentityServer.Mapper
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<RegisterInput, ApplicationUser>()
                .ForMember(
                    dest => dest.UserName,
                    opt => 
                        opt.MapFrom(x => $"{x.FirstName} {x.LastName}".Trim()))
                .ForMember(
                    dest => dest.IsActive,
                    opt => 
                        opt.MapFrom(x => true))
                .ForMember(
                    dest => dest.NormalizedEmail,
                    opt => 
                        opt.MapFrom(x => x.Email.ToUpper().Trim()))
                .ForMember(
                    dest => dest.NormalizedUserName,
                    opt => 
                        opt.MapFrom(x => $"{x.FirstName} {x.LastName}".ToUpper().Trim()))
                .ForMember(
                    dest => dest.CreationTime,
                    opt => 
                        opt.MapFrom(x => DateTime.Now))
                .ForMember(
                    dest => dest.Email,
                    opt => 
                        opt.MapFrom(x => x.Email.Trim()))
                .ForMember(
                    dest => dest.Login,
                    opt => 
                        opt.MapFrom(x => x.Login.Trim()))
                .ForMember(
                    dest => dest.FirstName,
                    opt => 
                        opt.MapFrom(x => x.FirstName.Trim()))
                .ForMember(
                    dest => dest.SecondName,
                    opt => 
                        opt.MapFrom(x => x.LastName.Trim()));
        }
    }
}