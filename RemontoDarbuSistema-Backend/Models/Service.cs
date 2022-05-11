using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RemontoDarbuSistema_Backend.Models
{
    public class Service
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public double HourlyPrice { get; set; }
        public bool Reservation { get; set; }
        public string PhoneNumber { get; set; }
        public string ContactEmail { get; set; }
        public string City { get; set; }

        [ForeignKey("UserId")]
        public string UserEmail { get; set; }
    }
}
