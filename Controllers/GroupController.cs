using Azure;
using HealthLink.Repositories;
using Microsoft.AspNetCore.Mvc;
using HealthLink.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HealthLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;
        public GroupController(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }

        // GET: api/<GroupController>
        [HttpGet]
        public IActionResult GetAllGroups()
        {
            return Ok(_groupRepository.GetAll());
        }

        [HttpGet("GetAllActive")]
        public IActionResult GetAllActiveGroups()
        {
            return Ok(_groupRepository.GetAllActive());
        }

        [HttpGet("GetByUserId/{userId}")]
        public IActionResult GetMyGroups(int userId) 
        {
            return Ok(_groupRepository.GetAllGroupsByMemberId(userId));
        }

        // GET api/<GroupController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok();
        }

        // POST api/<GroupController>
        [HttpPost]
        public IActionResult Post(Group group)
        {
            if (group.LeadUserProfileId == null)
            {
                return BadRequest("LeadUserProfileId is required.");
            }
            _groupRepository.Add(group);
            return CreatedAtAction(nameof(GetAllGroups), new { id = group.Id }, group);
        }

        // PUT api/<GroupController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<GroupController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
