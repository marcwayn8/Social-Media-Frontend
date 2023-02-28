import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";
import { useContext } from "react";
import AppContext from "../../context/appContext";
import "./comments.css";

export default function Comments({ allComments, aComment, setComments, post }) {
  const { user, setFeedMetric, feedMetric } = useContext(AppContext)

  const handleDelete = async (e) => {
    try {
      await fetch(`http://localhost:4005/comments/${allComments.comment_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filtered = aComment.filter(
        (c) => c.comment_id != allComments.comment_id
      );
      const map = {...feedMetric}
      map[post.post_id][0] -= 1
      setFeedMetric(map)
      setComments(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <List sx={{ width: "100%" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="" src={allComments.profile_pic} />
          </ListItemAvatar>
          <ListItemText
            className="comment-body"
            primary={allComments.comment_body}
            secondary={
              <div className="com-text">
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                ></Typography>
                {allComments.username}{" "}
                {DateTime.fromISO(allComments.time_posted).toRelative()}
                {allComments.user_id === user.user_id && (
                  <IconButton aria-label="delete" className="delete-comment">
                    <DeleteIcon
                      className="delete-comment"
                      type="submit"
                      onClick={handleDelete}
                    />
                  </IconButton>
                )}
              </div>
            }
          />
        </ListItem>
        <hr className="divide"></hr>
        {/* <Divider variant="inset" component="li"/> */}
      </List>
    </div>
  );
}
