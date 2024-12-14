using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VO;

namespace DAL
{
    internal class CartItemDAL
    {
        #region Variables & Properties
        private readonly DAO.DAOClass _dao = null;

        internal DAO.DAOClass Dao { get { return _dao; } }
        #endregion

        #region Constructors
        internal CartItemDAL(DAO.DAOClass dao)
        {
            _dao = dao;
        }
        #endregion

        #region Methods
        internal DataTable GetByIdCart(int id)
        {
            using (SqlCommand sqlCommand = new())
            {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@IdCart", SqlDbType.Int).Value = id;
                return _dao.QueryInformation($"{Schema.Products}.{Procedures.GetById}", parameters);
            }
        }
        internal bool Insert(CartItem cartItem)
        {
            SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<CartItem>(cartItem);
            return _dao.ExecuteProcedure($"{Schema.CartItems}.{Procedures.Insert}", parameters) > 0;

        }

        internal bool Update(CartItem cartItem)
        {
            SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<CartItem>(cartItem);
            return _dao.ExecuteProcedure($"{Schema.CartItems}.{Procedures.Update}", parameters) > 0;
        }

        #endregion      
    }
}
