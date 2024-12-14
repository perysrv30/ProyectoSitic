using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace VO
{
    [DataContract]
    public class OrderRequest : Request
    {
        [DataMember(EmitDefaultValue = false)]
        public Order Order { get; set; }
    }
}
