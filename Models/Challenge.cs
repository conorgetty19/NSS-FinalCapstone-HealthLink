using System;
using System.ComponentModel.DataAnnotations;

namespace HealthLink.Models
{
    public class Challenge
    {
        public int Id { get; set; }
        [Required]
        public DateTime CreatedDateTime { get; set; }
        [Required]
        public DateTime EndDateTime { get; set; }
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        [Required]
        [StringLength(150)]
        public string Description { get; set; }
        [Required]
        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}
