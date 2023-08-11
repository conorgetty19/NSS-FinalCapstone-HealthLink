/*
    UserProfileController.cs

    This controller handles API endpoints related to user profiles and group-user relationships.
    It provides methods for retrieving, creating, updating, and deleting user profiles and group-user relationships.

*/

using HealthLink.Models;
using HealthLink.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HealthLink.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }
        // GET: api/<UserProfileController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userProfileRepository.GetUsers());
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        // GET api/<UserProfileController>/5
        [HttpGet("Id/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_userProfileRepository.GetById(id));
        }

        [HttpGet("userSearch/{email}")]

        public IActionResult SearchUserProfile(string email)
        {
            return Ok(_userProfileRepository.GetByEmail(email));
        }

        // POST api/<UserProfileController>
        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreatedDateTime = DateTime.Now;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile
                );
        }

        [HttpPost("groupuser")]
        public IActionResult AddUserToGroup(GroupUser groupUser)
        {
            if (groupUser == null)
            {
                return BadRequest("Invalid group user data.");
            }

            _userProfileRepository.AddGroupUser(groupUser);

            return Ok(groupUser);
        }

        [HttpDelete("groupuser/{id}")]
        public IActionResult DeleteGroupUserById(int id)
        {
            GroupUser groupUser = _userProfileRepository.GetGroupUserById(id);
            if(groupUser == null)
            {
                return NotFound();
            }
            _userProfileRepository.DeleteGroupUser(groupUser.Id);
            return NoContent();
        }

        [HttpGet("GetGroupUserByBothIds/{groupId}/{userId}")]
        public IActionResult GetGroupUserByBothIds(int groupId, int userId)
        {
            GroupUser groupUser = _userProfileRepository.GetGroupUserByBothIds(groupId, userId);
            if (groupUser == null)
            {
                return NotFound();
            }
            return Ok(groupUser); 
        }
    }
}
