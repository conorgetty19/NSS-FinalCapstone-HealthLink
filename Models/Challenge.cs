using System;
using System.ComponentModel.DataAnnotations;

//ORM maps data from relational database onto a model
namespace HealthLink.Models
{
    public class Challenge
    {
        //unique identifier
        public int Id { get; set; }
        [Required]
        //tells when challenge was created
        public DateTime CreatedDateTime { get; set; }
        [Required]
        //tells when challenge ends (and therefore becomes inactive)
        public DateTime EndDateTime { get; set; }
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        [Required]
        [StringLength(150)]
        public string Description { get; set; }
        [Required]
        //identifies which group the challenge is for
        public int GroupId { get; set; }
        //attaches group info
        public Group Group { get; set; }
    }
}
