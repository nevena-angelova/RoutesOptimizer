using AutoMapper;
using RoutesOptimizer.Data.Models;
using RoutesOptimizer.Dto;

namespace RoutesOptimizer
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<Stop, StopDto>();
        }
    }
}
