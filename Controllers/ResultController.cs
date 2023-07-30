using HealthLink.Models;
using HealthLink.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
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
        public IActionResult Get(int id)
        {
            var result = _resultRepository.GetById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("GetByChallengeId/{id}")]
        public IActionResult GetByChallengeId(int id)
        {
            List<Result> results = _resultRepository.GetResultsByChallengeId(id);
            return Ok(results);
        }

        // POST api/<ResultController>
        [HttpPost]
        public IActionResult Post(Result result)
        {
            _resultRepository.Add(result);
            return Ok(result);
        }

        // PUT api/<ResultController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Result updatedResult)
        {
            var existingResult = _resultRepository.GetById(id);
            if (existingResult == null)
            {
                return NotFound();
            }
            existingResult.Content = updatedResult.Content;
            existingResult.UpdateDateTime = updatedResult.UpdateDateTime;

            _resultRepository.Update(existingResult);
            return Ok(existingResult);
        }

        // DELETE api/<ResultController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Result resultToDelete = _resultRepository.GetById(id);

            if (resultToDelete == null)
            {
                return NotFound();
            }

            try
            {
                _resultRepository.Delete(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the result: {ex.Message}");
            }
        }
    }
}
