//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Project_Management.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class TeamUserMapping
    {
        public int MapId { get; set; }
        public string UserId { get; set; }
        public int TeamId { get; set; }
        public System.DateTime CreatedDate { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
        public virtual Team Team { get; set; }
    }
}
