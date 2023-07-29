using System;
using System.ComponentModel.DataAnnotations;

namespace HealthLink.Models
{
    public class Result
    {
        public int Id { get; set; }
        [Required]
        public int GroupUserId { get; set; }
        [Required]
        public int ChallengeId { get; set; }
        [Required]
        [StringLength(100)]
        public string Content { get; set; }
        [Required]
        public DateTime UpdateDateTime { get; set; }
        public GroupUser? groupUser { get; set; }
    }
}

