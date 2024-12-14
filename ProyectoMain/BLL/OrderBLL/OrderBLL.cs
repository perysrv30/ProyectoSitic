using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VO;

namespace BLL
{
    public class OrderBLL
    {
        #region Variables & properties
        OrderDAL _dal;

        private DAO.DAOClass Dao { get { return _dal?.Dao; } }
        #endregion

        #region Constructors
        public OrderBLL(DAO.DAOClass dao) : base()
        {
            _dal = new(dao);
        }
        #endregion

        #region Methods
        public Order GetById(int id)
        {
            Order order  = null;
            using (DataTable dt = _dal.GetById(id))
            {
                if (dt?.Rows?.Count > 0)
                    order = Utilities.CommonUtils.ConvertToObject<Order>(dt.Rows[0]);
            }
            return order;
        }

        public List<Order> GetAll()
        {
            using (DataTable dt = _dal.GetAll())
                return Utilities.CommonUtils.ConvertDataTableToList<Order>(dt);
        }


        public bool ExecuteDBAction(eDbAction action, Order order)
        {
            bool ok;

            try
            {

                ok = action switch
                {
                    eDbAction.Insert => Insert(order),
                    eDbAction.Update => Update(order),
                    eDbAction.Delete => Delete(order.Id),
                    _ => false
                };

            }
            catch (Exception ex)
            {
                throw new Exception();
            }

            return ok;
        }
        #endregion

        #region Private methods
        private bool Insert(Order order)
        {
            DAO.DAOClass dao = Dao;
            return Utilities.TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.Insert(order);
            });
        }

        private bool Update(Order order)
        {
            DAO.DAOClass dao = Dao;
            return Utilities.TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.Update(order);
            });
        }

        private bool Delete(int id)
        {
            DAO.DAOClass dao = Dao;
            return Utilities.TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.Delete(id);
            });
        }
        #endregion
    }
}
