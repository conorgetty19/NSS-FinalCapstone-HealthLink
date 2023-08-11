using System;
using System.ComponentModel.DataAnnotations;

//ORM maps data from relational database onto a model
namespace HealthLink.Models
{
    //represents a result related to a specific user and a specific challenge
    public class Result
    {
        //unique identifier
        public int Id { get; set; }
        [Required]
        //relates a result to the group-user relationship stored in a groupuser object
        public int GroupUserId { get; set; }
        [Required]
        //relates a result to a specific challenge
        public int ChallengeId { get; set; }
        [Required]
        [StringLength(100)]
        //user created content
        public string Content { get; set; }
        [Required]
        //stores the date and time that the result was last updated (or initially created)
        public DateTime UpdateDateTime { get; set; }
        //stores optional groupuser object
        //could be used to link result to a specific group or user
        public GroupUser? groupUser { get; set; }
    }
}

