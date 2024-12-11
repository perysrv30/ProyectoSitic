using System;
using System.Collections.Generic;
using System.Data;
using VO;
using DAL;

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

        #endregion
    }
}
