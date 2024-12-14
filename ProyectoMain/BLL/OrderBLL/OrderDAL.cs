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
    internal class OrderDAL
    {
        #region Variables & Properties
        private readonly DAO.DAOClass _dao = null;

        internal DAO.DAOClass Dao { get { return _dao; } }
        #endregion

        #region Constructors
        internal OrderDAL(DAO.DAOClass dao)
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
                return _dao.QueryInformation($"{Schema.Orders}.{Procedures.GetById}", parameters);
            }
        }

        internal DataTable GetAll()
        {
            return _dao.QueryInformation($"{Schema.Orders}.{Procedures.GetAll}");
        }

        internal bool Insert(Order order)
        {
            SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<Order>(order);
            return _dao.ExecuteProcedure($"{Schema.Orders}.{Procedures.Insert}", parameters) > 0;
        }

        internal bool Update(Order order)
        {
            SqlParameterCollection parameters = Utilities.CommonUtils.AddParametersFromObject<Order>(order);
            return _dao.ExecuteProcedure($"{Schema.Orders}.{Procedures.Update}", parameters) > 0;
        }

        internal bool Delete(int id)
        {
            using (SqlCommand sqlCommand = new())
            {
                SqlParameterCollection parameters = sqlCommand.Parameters;
                parameters.Add("@Id", SqlDbType.Int).Value = id;
                return _dao.ExecuteProcedure($"{Schema.Orders}.{Procedures.Delete}", parameters) > 0;
            }
        }
        #endregion 
    }
}
