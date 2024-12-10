-- Author:		Esperanza Romero
-- Description:	Obtiene una lista de Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Orders].[GetByAll]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Orders].[GetByAll]
GO
CREATE PROCEDURE [Orders].[GetByAll]
WITH  ENCRYPTION  
AS 
BEGIN	
	SELECT	Id				AS 'Id', 
			Total_Price		AS 'TotalPrice',
			Status			AS 'Status',
			Created_At		AS 'CreatedAt', 
			Updated_At		AS 'UpdatedAt' 
	FROM Orders
END
GO
EXEC sp_recompile N'[Orders].[GetByAll]';
GO