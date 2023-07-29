using HealthLink.Models;
using HealthLink.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HealthLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController : ControllerBase
    {
        private IResultRepository _resultRepository;

        public ResultController(IResultRepository resultRepository)
        {
            _resultRepository = resultRepository;
        }
        // GET: api/<ResultController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        // GET api/<ResultController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("GetByChallengeId/{id}")]
        public IActionResult GetByChallengeId(int id)
        {
            List<Result> results = _resultRepository.GetResultsByChallengeId(id);
            return Ok(results);
        }

        // POST api/<ResultController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ResultController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ResultController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
