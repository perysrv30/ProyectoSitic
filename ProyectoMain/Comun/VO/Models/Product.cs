using System;
using System.Runtime.Serialization;

namespace VO
{
    [DataContract]
    public class Product
    {
        [DataMember(EmitDefaultValue = false)]
        public int Id { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public string Name { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public string Description { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public double Price { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public int CurrentStock { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public int MaxStock { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public int MinStock { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public eStockStatus StockStatusId { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public string Imagepath { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public DateTime CreatedAt { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public DateTime UpdatedAt { get; set; }
    }
}
