# belly-button-challenge

Solution for the proposal of the project 2 (Option 1 - Default) presented.


## The solution for this Project is presented in the following structure:

1) Crowdfunding_ETL/README.md (this file).

2) Crowdfunding_ETL/Resources/ = Folder containing the resource files in .XLSX format along with the .CSV output files:
    - /contacts.xlsx = Original source table of contacts.
    - /crowdfunding.xlsx = Original source table of the campaign info.
    - /campaign.csv = Output campaign table with the transformed Data.
    - /category.csv = Output categories table.
    - /subcategory.csv = Output sub-categories table.
    - /contacts.csv = Output contacts table with the transformed Data.

3) Crowdfunding_ETL/ETL_Mini_Project_Starter_Code.ipynb = Notebook file used to:
    - Load the source .xlsx files,
    - Inspect and transformt the data,
    - Create and configure Pandas DataFrames with the new data to be used in the new DB,
    - Outputting the Dataframes into .CSV files.

4) Crowdfunding_ETL/resources_scan.ipynb = Notebook file used to inspect the file names and columns of the output files to be loaded into the new DB.

5) Crowdfunding_ETL/Crowfunding_DB/ = Folder containing the files involved in the creation and execution of the Database:
    - /crowdfunding_db_BU.sql = Backup file of the output Database.
    - /crowdfunding_db_schema.sql = Schema output from QuickDB, used to query the creation of Database Tables, formats and relatioships in .TXT format.
    - /QuickDBD-export.png = Output of schema image from QuickDB.
        ![campaign](/Crowfunding_DB/QuickDBD-export.png)
    - /QuickDBD-export.txt = Prompt input in QuickDB to obtain schema image and sql-query from QuickDB.
    - /Select-[Campaign, Cat, Subcat, Contacts].png = Screenshots of "SELECT * from {Tablename}" queries to test result of DB load process.

    ![campaign](/Crowfunding_DB/Select-Campaign.png)
    ---
    ![cat](/Crowfunding_DB/Select-Cat.png)
    ---
    ![subcat](/Crowfunding_DB/Select-Subcat.png)
    ---
    ![contacts](/Crowfunding_DB/Select-Contacts.png)

    QuickDB ('https://app.quickdatabasediagrams.com/#/')






