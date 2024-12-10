IF OBJECT_ID('trg_UpdateUpdateAt_Products', 'TR') IS NOT NULL
BEGIN 
	DROP TRIGGER trg_UpdateUpdateAt_Products;
END
GO

CREATE TRIGGER trg_UpdateUpdateAt_Products
ON [dbo].[Products]
AFTER UPDATE
AS
BEGIN 
	SET NOCOUNT ON 

	UPDATE Products
	SET Updated_at = GETDATE()
	FROM inserted i
	WHERE Products.Id = i.Id
END
