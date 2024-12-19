using System;
using System.Data.SqlClient;
using System.Data;
using VO;
using System.Collections.Generic;
using DAL;

namespace BLL
{
    public class CartBLL
    {
        #region Variables & properties
        CartDAL _dal;

        private DAO.DAOClass Dao { get { return _dal?.Dao; } }
        #endregion

        #region Constructors
        public CartBLL(DAO.DAOClass dao) : base()
        {
            _dal = new(dao);
        }
        #endregion

        #region Methods
        public Cart GetById(int id)
        {
            Cart cart = null;
            using (DataTable dt = _dal.GetById(id))
            {
                if (dt?.Rows?.Count > 0)
                    cart = Utilities.CommonUtils.ConvertToObject<Cart>(dt.Rows[0]);
            }
            return cart;
        }
        public List<Cart> GetAll()
        {
            using (DataTable dt = _dal.GetAll())
                return Utilities.CommonUtils.ConvertDataTableToList<Cart>(dt);
        }

        public bool ExecuteDBAction(eDbAction action, Cart cart)
        {
            bool ok;

            try
            {

                ok = action switch
                {
                    eDbAction.Insert => Insert(cart),
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
        private bool Insert(Cart cart)
        {
            DAO.DAOClass dao = Dao;
            return Utilities.TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.Insert(cart);
            });
        }

        #endregion
    }
}
