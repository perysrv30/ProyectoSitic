using System;
using System.Data;
using DAL;
using VO;

namespace BLL
{
    public class CartItemBLL
    {
        #region Variables & properties
        CartItemDAL _dal;

        private DAO.DAOClass Dao { get { return _dal?.Dao; } }
        #endregion

        #region Constructors
        public CartItemBLL(DAO.DAOClass dao) : base()
        {
            _dal = new(dao);
        }
        #endregion

        #region Methods

        public bool ExecuteDBAction(eDbAction action, CartItem cartItem)
        {
            bool ok;

            try
            {

                ok = action switch
                {
                    eDbAction.Insert => Insert(cartItem),
                    eDbAction.Update => Update(cartItem),
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
        private bool Insert(CartItem cartItem)
        {
            DAO.DAOClass dao = Dao;
            return Utilities.TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.Insert(cartItem);
            });
        }

        private bool Update(CartItem cartItem)
        {
            DAO.DAOClass dao = Dao;
            return Utilities.TransactionUtils.ExecuteWithTransaction(ref dao, () =>
            {
                return _dal.Update(cartItem);
            });
        }

        public CartItem GetByIdCart(int id)
        {
            CartItem cartItem = null;
            using (DataTable dt = _dal.GetByIdCart(id))
            {
                if (dt?.Rows?.Count > 0)
                    cartItem = Utilities.CommonUtils.ConvertToObject<CartItem>(dt.Rows[0]);
            }
            return cartItem;
        }


        #endregion
    }
}
