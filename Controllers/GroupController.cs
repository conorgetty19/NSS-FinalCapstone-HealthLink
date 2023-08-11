/*
    GroupController.cs

    This controller handles API endpoints related to groups.
    It provides methods for retrieving, creating, updating, and managing groups.

*/

using HealthLink.Repositories;
using Microsoft.AspNetCore.Mvc;
using HealthLink.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HealthLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IChallengeRepository _challengeRepository;
        public GroupController(IGroupRepository groupRepository, IUserProfileRepository userProfileRepository, IChallengeRepository challengeRepository)
        {
            _groupRepository = groupRepository;
            _userProfileRepository = userProfileRepository;
            _challengeRepository = challengeRepository;
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
        public IActionResult GetGroupById(int id)
        {
            var group = _groupRepository.GetGroupById(id);
            if (group == null)
            {
                return NotFound();
            }

            // Include the members and their user profiles
            group.Members = _userProfileRepository.GetGroupMembersWithProfilesByGroupId(id);
            group.Challenges = _challengeRepository.GetChallengesByGroupId(id);

            return Ok(group);
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
        public IActionResult Put(int id, Group updatedGroup)
        {
            // Check if the provided group id exists
            var existingGroup = _groupRepository.GetGroupById(id);
            if (existingGroup == null)
            {
                return NotFound();
            }

            // Update the properties of the existing group with the new values
            existingGroup.Title = updatedGroup.Title;
            existingGroup.Description = updatedGroup.Description;
            existingGroup.ImageUrl = updatedGroup.ImageUrl;
            existingGroup.LeadUserProfileId = updatedGroup.LeadUserProfileId;

            // Call the repository method to update the group
            _groupRepository.Update(existingGroup);

            return Ok(existingGroup);
        }
    }
}
