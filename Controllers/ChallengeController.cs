/*
    ChallengeController.cs

    This controller handles API endpoints related to challenges.
    It provides methods for retrieving, creating, and updating challenges.

*/

using Microsoft.AspNetCore.Mvc;
using HealthLink.Repositories;
using HealthLink.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HealthLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChallengeController : ControllerBase
    {
        private IChallengeRepository _challengeRepository;

        public ChallengeController(IChallengeRepository challengeRepository)
        {
            _challengeRepository = challengeRepository;
        }

        // GET api/<ChallengeController>/5
        [HttpGet("{id}")]
        public IActionResult GetChallengeById(int id)
        {
            Challenge challenge = _challengeRepository.GetChallengeById(id);
            if (challenge == null)
            {
                return NotFound();
            }
            return Ok(challenge);
        }

        // POST api/<ChallengeController>
        [HttpPost]
        public IActionResult Post(Challenge challenge)
        {
            _challengeRepository.Add(challenge);
            return CreatedAtAction(nameof(GetChallengeById), new { id = challenge.Id }, challenge);
        }

        // PUT api/<ChallengeController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Challenge challenge)
        {
            Challenge existingChallenge = _challengeRepository.GetChallengeById(id);
            if (existingChallenge == null)
            {
                return NotFound();
            }
            existingChallenge.EndDateTime = challenge.EndDateTime;
            existingChallenge.Title = challenge.Title;
            existingChallenge.Description = challenge.Description;
            _challengeRepository.Update(existingChallenge);
            return Ok(existingChallenge);
        }
    }
}
