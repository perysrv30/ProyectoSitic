IF OBJECT_ID('trg_UpdateCartAndStock', 'TR') IS NOT NULL
BEGIN 
    DROP TRIGGER trg_UpdateCartAndStock;
END
GO

CREATE TRIGGER trg_UpdateCartAndStock
ON Cart_Items
AFTER INSERT, UPDATE
AS
BEGIN 
    SET NOCOUNT ON;

    DECLARE @cartId INT;
    DECLARE @totalPrice DECIMAL(10, 2);

    SELECT @cartId = Cart_Id FROM inserted;

    SELECT @totalPrice = SUM(price * quantity)
    FROM Cart_Items
    WHERE Cart_Id = @cartId;

    UPDATE Carts
    SET Total_Price = @totalPrice
    WHERE id = @cartId;

	  DECLARE @productId INT;
    DECLARE @quantity INT;
    DECLARE @oldQuantity INT;

    DECLARE product_cursor CURSOR FOR
        SELECT Product_Id, quantity, 
               (SELECT quantity FROM deleted WHERE Product_Id = inserted.Product_Id) AS oldQuantity 
        FROM inserted;

    OPEN product_cursor;

    FETCH NEXT FROM product_cursor INTO @productId, @quantity, @oldQuantity;

    WHILE @@FETCH_STATUS = 0
    BEGIN
       
        DECLARE @quantityChange INT;
        
        IF @oldQuantity IS NULL
        BEGIN
          
            SET @quantityChange = @quantity;
        END
        ELSE
        BEGIN
          
            SET @quantityChange = @quantity - @oldQuantity;
        END

       
        UPDATE Products
        SET Current_Stock = Current_Stock - @quantityChange, Updated_at = GETDATE()
        WHERE id = @productId;

        FETCH NEXT FROM product_cursor INTO @productId, @quantity, @oldQuantity;
    END

    CLOSE product_cursor;
    DEALLOCATE product_cursor;

END
GO