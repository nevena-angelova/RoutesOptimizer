using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoutesOptimizer.Data;
using RoutesOptimizer.Dto;

namespace RoutesOptimizer.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class RoutesController : ControllerBase
    {
        private readonly ILogger<RoutesController> _logger;
        private readonly IMapper _mapper;
        private readonly RoutesOptimizerDbContext _dbContext;

        public RoutesController(RoutesOptimizerDbContext dbContext, ILogger<RoutesController> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _dbContext = dbContext;
        }

        [HttpGet(Name = "GetStops")]
        public IEnumerable<StopDto> GetStops(string name)
        {
            return _mapper.Map<List<StopDto>>(_dbContext.Stops
                .Where(x => x.Name.ToLower().Contains(name.ToLower()))
                .ToList());
        }
    }
}
