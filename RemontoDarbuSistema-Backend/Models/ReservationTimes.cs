using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace RemontoDarbuSistema_Backend.Models
{
    public class ReservationTimes
    {
        [Key]
        [IgnoreDataMember]

        public int Id { get; set; }
        public DateTime start { get; set; }
        public DateTime end { get; set; }
    }
}
