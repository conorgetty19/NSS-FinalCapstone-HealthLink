using System.ComponentModel.DataAnnotations;

namespace HealthLink.Models
{
    public class GroupUser
    {
        public int Id { get; set; }
        [Required]
        public int GroupId { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        public Group Group { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
