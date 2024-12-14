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
    internal class OrderItemDAL
    {
        #region Variables & Properties
        private readonly DAO.DAOClass _dao = null;

        internal DAO.DAOClass Dao { get { return _dao; } }
        #endregion

        #region Constructors
        internal OrderItemDAL(DAO.DAOClass dao)
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
                return _dao.QueryInformation($"{Schema.OrderItems}.{Procedures.GetById}", parameters);
            }
        }

        internal DataTable GetAll()
        {
            return _dao.QueryInformation($"{Schema.OrderItems}.{Procedures.GetAll}");
        }

        internal bool Insert(OrderItem orderItem)
        {
            SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<OrderItem>(orderItem);
            return _dao.ExecuteProcedure($"{Schema.OrderItems}.{Procedures.Insert}", parameters) > 0;
        }

        internal bool Update(OrderItem orderItem)
        {
            SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<OrderItem>(orderItem);
            return _dao.ExecuteProcedure($"{Schema.OrderItems}.{Procedures.Update}", parameters) > 0;
        }

        internal bool Delete(int id)
        {
            using (SqlCommand sqlCommand = new())
            {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;
                return _dao.ExecuteProcedure($"{Schema.OrderItems}.{Procedures.Delete}", parameters) > 0;
            }
        }
        #endregion 
    }
}

