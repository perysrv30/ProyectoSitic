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
    public class OrderItemBLL
    {
        #region Variables & properties
        OrderItemDAL _dal;

        private DAO.DAOClass Dao { get { return _dal?.Dao; } }
        #endregion

        #region Constructors
        public OrderItemBLL(DAO.DAOClass dao) : base()
        {
            _dal = new(dao);
        }
        #endregion

        #region Methods
        public OrderItem GetById(int id)
        {
            OrderItem orderItem = null;
            using (DataTable dt = _dal.GetById(id))
            {
                if (dt?.Rows?.Count > 0)
                    orderItem = Utilities.CommonUtils.ConvertToObject<OrderItem>(dt.Rows[0]);
            }
            return orderItem;
        }

        public List<OrderItem> GetAll()
        {
            using (DataTable dt = _dal.GetAll())
                return Utilities.CommonUtils.ConvertDataTableToList<OrderItem>(dt);
        }


        public bool ExecuteDBAction(eDbAction action, OrderItem orderItem)
        {
            bool ok;

            try
            {

                ok = action switch
                {
                    eDbAction.Insert => Insert(orderItem),
                    eDbAction.Update => Update(orderItem),
                    eDbAction.Delete => Delete(orderItem.Id),
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
        private bool Insert(OrderItem orderItem)
        {
            DAO.DAOClass dao = Dao;
            return Utilities.TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.Insert(orderItem);
            });
        }

        private bool Update(OrderItem orderItem)
        {
            DAO.DAOClass dao = Dao;
            return Utilities.TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.Update(orderItem);
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
