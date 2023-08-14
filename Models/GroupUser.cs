using System.ComponentModel.DataAnnotations;

//ORM maps data from relational database onto a model
namespace HealthLink.Models
{
    //represents a group-user relationship
    //e.g. a user joins a group and a groupuser is created
    public class GroupUser
    {
        //unique identifier
        public int Id { get; set; }
        [Required]
        //identifies the group in a group-user relationship
        public int GroupId { get; set; }
        [Required]
        //identifies the user in the group-user relationship
        public int UserProfileId { get; set; }
        //used to attach group info (title, description, etc.)
        public Group Group { get; set; }
        //can be used to attach user info
        public UserProfile? UserProfile { get; set; }
    }
}
