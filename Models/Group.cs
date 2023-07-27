using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HealthLink.Models
{
    public class Group
    {
        public int Id { get; set; }
        [Required]
        public int? LeadUserProfileId { get; set; }
        [Required]
        [StringLength(255)]
        public string Title { get; set; }
        [Required]
        [StringLength(255)]
        public string Description { get; set; }
        [Required]
        [StringLength(255)]
        public string ImageUrl { get; set; }
        [Required]
        public DateTime CreatedDateTime { get; set; }
        public UserProfile? LeadUserProfile { get; set; }
        public List<GroupUser>? Members { get; set; }
        public List<Challenge>? Challenges { get; set; }
    }
}
