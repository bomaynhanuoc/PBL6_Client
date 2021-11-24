import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/toast";
import { fetchSuccess, fetchError } from "../slices/common";

const useToastInfo = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.common);

  useEffect(() => {
    if (message) {
      // console.log(message);
      toast({
        title: message,
        status: "success",
        duration: 1500,
        position: "bottom-left",
      });
      dispatch(fetchSuccess(""));
    }

    if (error) {
      // console.log(error);
      toast({
        title: error,
        status: "error",
        duration: 1500,
        position: "bottom-left",
      });
      dispatch(fetchError(""));
    }
  }, [message, error, dispatch, toast]);
};

export default useToastInfo;
