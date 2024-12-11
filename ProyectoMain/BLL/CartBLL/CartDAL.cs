using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VO;

namespace DAL
{
    internal class CartDAL
    {
        #region Variables & Properties
        private readonly DAO.DAOClass _dao = null;

        internal DAO.DAOClass Dao { get { return _dao; } }
        #endregion

        #region Constructors
        internal CartDAL(DAO.DAOClass dao)
        {
            _dao = dao;
        }
        #endregion

        #region Methods
        internal DataTable GetById(int id)
        {
            using (SqlCommand sqlCommand = new())
            {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;
                return _dao.QueryInformation($"{Schema.Carts}.{Procedures.GetById}", parameters);
            }
        }

        internal bool Insert(Cart cart)
        {
            SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<Cart>(cart);
            return _dao.ExecuteProcedure($"{Schema.Carts}.{Procedures.Insert}", parameters) > 0;
          
        }

        #endregion       
    }
}
