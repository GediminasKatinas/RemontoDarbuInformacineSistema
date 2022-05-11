using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RemontoDarbuSistema_Backend.Models
{
    public class UserReservation
    {
        [Key]
        public int Id { get; set; }
        
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string ServiceName { get; set; }
        public int Price { get; set; }
        public string Status { get; set; }
        public int ServiceId { get; set; }

    }
}
