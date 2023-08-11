using System;
using System.ComponentModel.DataAnnotations;

//ORM maps data from relational database onto a model
namespace HealthLink.Models
{
    //represents a user profile in the application
    public class UserProfile
    {
        //unique identifier
        public int Id { get; set; }
        [StringLength(28)]
        //firebase id is used for authentication on log in
        public string FirebaseUserId { get; set; }
        [Required]
        [StringLength(50)]
        // user-selected user name
        public string Username { get; set; }
        [Required]
        [StringLength(100)]
        public string FullName { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [StringLength(255)]
        //optional image url
        public string? ImageUrl { get; set; }
        [Required]
        //describes when the user profile was created
        public DateTime CreatedDateTime { get; set; }
    }
}

