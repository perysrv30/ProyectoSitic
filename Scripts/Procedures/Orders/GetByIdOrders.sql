-- Author:		Esperanza Romero
-- Description:	Obtiene un Producto por un Id
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Orders].[GetById]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Orders].[GetById]
GO
CREATE PROCEDURE [Orders].[GetById]
	@Id				INT
WITH  ENCRYPTION  
AS 
BEGIN	
	SELECT	Id				AS 'Id', 
			Total_Price		AS 'TotalPrice',
			Status			AS 'Status',
			Created_At		AS 'CreatedAt', 
			Updated_At		AS 'UpdatedAt' 
	FROM Orders
	WHERE Id = @Id
END
GO
EXEC sp_recompile N'[Orders].[GetById]';
GO