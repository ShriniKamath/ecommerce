import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import axios from "axios";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

export default function ApplicationList() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [error, setError] = React.useState([]);
  let navigate = useNavigate();

  React.useEffect(() => {
    const fetchApplicationList = async () => {
      setLoading(true);
      try {
        const data = await axios.get(
          "https://engineering-task.elancoapps.com/api/resources"
        );
        setData(data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchApplicationList();
  }, []);
  const handleTextFieldChange = (e) => {
    let searchTextValue = e.target.value;
    setSearchText(searchTextValue);
    let filteredData = [];
    if (searchTextValue != "")
      filteredData = data.filter((elem) => elem.indexOf(searchTextValue) >= 0);
    setFilteredData(filteredData);
  };
  return (
    <div>
      {" "}
      {loading && <div> Loading... </div>}{" "}
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Search"
              onChange={handleTextFieldChange}
              variant="standard"
            />
          </Box>
        </Grid>
        {!loading && searchText === ""
          ? data.map((resource) => {
              return (
                <Grid item xs={2}>
                  <Card
                    sx={{
                      maxWidth: 245,
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {" "}
                          {resource}{" "}
                        </Typography>{" "}
                        <Typography variant="body2" color="text.secondary">
                          This is {resource}.{" "}
                          <Button
                            size="small"
                            onClick={() => navigate(`/resources/${resource}`)}
                            color="primary"
                          >
                            Know more
                          </Button>{" "}
                        </Typography>{" "}
                      </CardContent>{" "}
                    </CardActionArea>{" "}
                    <CardActions></CardActions>{" "}
                  </Card>{" "}
                </Grid>
              );
            })
          : filteredData.map((resource) => {
              return (
                <Grid item xs={2}>
                  <Card
                    sx={{
                      maxWidth: 245,
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {" "}
                          {resource}{" "}
                        </Typography>{" "}
                        <Typography variant="body2" color="text.secondary">
                          This is {resource}.{" "}
                          <Button
                            size="small"
                            onClick={() => navigate(`/resources/${resource}`)}
                            color="primary"
                          >
                            Know more
                          </Button>{" "}
                        </Typography>{" "}
                      </CardContent>{" "}
                    </CardActionArea>{" "}
                    <CardActions></CardActions>{" "}
                  </Card>{" "}
                </Grid>
              );
            })}
      </Grid>
    </div>
  );
}
