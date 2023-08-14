using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

//ORM maps data from relational database onto a model
namespace HealthLink.Models
{
    //represents a group that users can join via group-user
    public class Group
    {
        //unique identifier
        public int Id { get; set; }
        [Required]
        //identifies which user leads the group (special priveleges)
        public int? LeadUserProfileId { get; set; }
        [Required]
        [StringLength(255)]
        public string Title { get; set; }
        [Required]
        [StringLength(255)]
        public string Description { get; set; }
        [Required]
        [StringLength(255)]
        //required image url
        public string ImageUrl { get; set; }
        [Required]
        //tells when group was created
        public DateTime CreatedDateTime { get; set; }
        //used to attach leaders user profile
        public UserProfile LeadUserProfile { get; set; }
        //attaches a list of all members associated with group
        public List<GroupUser> Members { get; set; }
        //attaches a list of all challenges associated with group
        public List<Challenge> Challenges { get; set; }
    }
}
