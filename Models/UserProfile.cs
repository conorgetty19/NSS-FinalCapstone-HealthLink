using System;
using System.ComponentModel.DataAnnotations;

namespace HealthLink.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [StringLength(28)]
        public string FirebaseUserId { get; set; }
        [Required]
        [StringLength(50)]
        public string Username { get; set; }
        [Required]
        [StringLength(100)]
        public string FullName { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [StringLength(255)]
        public string? ImageUrl { get; set; }
        [Required]
        public DateTime CreatedDateTime { get; set; }
    }
}

