import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ApplicationPage() {
  const { name } = useParams();
  const [apploading, setAppLoading] = React.useState(true);
  const [applicationData, setApplicationData] = React.useState([]);
  const [apperror, setAppError] = React.useState([]);
  React.useEffect(() => {
    const fetchApplication = async () => {
      setAppLoading(true);
      try {
        const data = await axios.get(
          `https://engineering-task.elancoapps.com/api/resources/${name}`
        );
        console.log(data.data);
        setApplicationData(data.data);
        setAppLoading(false);
      } catch (error) {
        setAppError(error);
      }
    };
    fetchApplication();
  }, []);
  const columns = [
    { field: "ConsumedQuantity", headerName: "Consumed Quantity", width: 150 },
    { field: "Cost", headerName: "Cost", width: 100 },
    { field: "Date", headerName: "Date", width: 100 },
    { field: "MeterCategory", headerName: "Meter Category", width: 150 },
    { field: "ResourceGroup", headerName: "Resource Group", width: 150 },
    { field: "ResourceLocation", headerName: "Resource Location", width: 150 },
    { field: "UnitOfMeasure", headerName: "Unit Of Measure", width: 150 },
    { field: "Location", headerName: "Location", width: 150 },
    { field: "ServiceName", headerName: "Service Name", width: 150 },
  ];
  return (
    <div>
      {apploading && <div> Loading... </div>}
      {!apploading && (
        <div style={{ height: 650, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.InstanceId + row.Cost}
            rows={applicationData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 15, 50, 100]}
            checkboxSelection={false}
          />
        </div>
      )}
    </div>
  );
}
