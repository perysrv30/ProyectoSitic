-- Author:		Esperanza Romero
-- Description:	Inserta Productos
-- Fecha:		09/11/2024
IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[Products].[Insert]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [Products].[Insert]
GO
CREATE PROCEDURE [Products].[Insert]
	@Name			VARCHAR(255),
	@Description	TEXT,
	@Price			DECIMAL(18,2), 
	@CurrentStock	INT,
	@MaxStock		INT, 
	@MinStock		INT, 
	@Imagepath		VARCHAR(255)
WITH  ENCRYPTION  
AS 
BEGIN	
	INSERT INTO Products (Name, Description, Price, Current_Stock,
	Max_Stock, Min_Stock, Image_Path)
	VALUES (@Name, @Description, @Price, @CurrentStock,
	@MaxStock, @MinStock, @ImagePath)
END
GO
EXEC sp_recompile N'[Products].[Insert]';
GO