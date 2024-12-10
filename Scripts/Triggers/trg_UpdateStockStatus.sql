IF OBJECT_ID('trg_UpdateStockStatus', 'TR') IS NOT NULL
BEGIN 
	DROP TRIGGER trg_UpdateStockStatus;
END
GO

CREATE TRIGGER trg_UpdateStockStatus
ON [dbo].[Products]
AFTER INSERT, UPDATE
AS
BEGIN 
	IF UPDATE(Current_Stock) OR EXISTS (SELECT 1 FROM inserted)
	BEGIN 

		DECLARE @OutOfStockId		INT, 
				@LowStockId			INT,
				@InStockId			INT, 
				@StatusStockId		INT

				SELECT @OutOfStockId = Id
				FROM Stock_Status
				WHERE [Key] = 'OUT_OF_STOCK'

				SELECT @LowStockId = Id
				FROM Stock_Status
				WHERE [Key] = 'LOW_STOCK'

				SELECT @InStockId = Id
				FROM Stock_Status
				WHERE [Key] = 'IN_STOCK'

		IF CURSOR_STATUS('GLOBAL', 'cursor_products') >= 1
		BEGIN
			CLOSE cursor_products
			DEALLOCATE cursor_products 
		END

		DECLARE @ProductId		INT,
				@CurrentStock	INT,
				@MinStock		INT

		DECLARE cursor_products CURSOR FAST_FORWARD FOR 

		SELECT	Id, -- 0 @ProductId
				Current_Stock,  -- 1 @CurrentStock
				Min_Stock -- 2 @MinStock
		FROM Products

		OPEN cursor_products

		FETCH NEXT FROM cursor_products INTO @ProductId, @CurrentStock, @MinStock

		WHILE @@FETCH_STATUS = 0
		BEGIN
			IF (ISNULL(@CurrentStock,0) = 0)
				SET @StatusStockId = @OutOfStockId
			ELSE IF  (@CurrentStock <= @MinStock)
				SET @StatusStockId = @LowStockId
			ELSE  
				SET @StatusStockId = @InStockId
				

			UPDATE Products
			SET Stock_Status_Id = @StatusStockId
			WHERE Id = @ProductId

			FETCH NEXT FROM cursor_products INTO @ProductId, @CurrentStock, @MinStock
		END

		CLOSE cursor_products
		DEALLOCATE cursor_products 
	END
END