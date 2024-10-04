import { AddRecord, AddRecordBody, updateRecord } from "@/lib/api/record";
import useNotifications from "@/lib/hooks/useNotifications";
import useToast from "@/lib/hooks/useToasts";
import { RootState } from "@/lib/redux/store";
import { useAppStore } from "@/lib/store/useAppStore";
import { LivestockCategory } from "@/lib/types/livestockcategory";
import { Record } from "@/lib/types/record";
import { today } from "@/lib/utils/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  otherData: any;
  setOpen: any;
  category?: LivestockCategory;
  edit?: boolean;
  record?: Record;
  dam?: any;
  sire?: any;
};

const useRecordFormSubmission = ({
  otherData,
  setOpen,
  category,
  edit,
  record,
  sire,
  dam,
}: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const { DBDetails } = useAppStore();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { createNotification } = useNotifications();
  const { showToast } = useToast();

  const createMutation = useMutation(
    (newItem: AddRecordBody) => AddRecord(newItem),
    {
      onSuccess: () => {
        showToast(
          `New ${otherData.category.name || category?.name} added`,
          "success"
        );

        queryClient.invalidateQueries([`records`]);
      },
      onMutate: () => {
        showToast("Submitting", "success");
      },
    }
  );
  const updateMutation = useMutation(
    (newItem: AddRecordBody) => updateRecord(Number(record?.id), newItem),
    {
      onMutate: () => {
        showToast("updating", "success");
      },
      onSuccess: () => {
        showToast(`${record?.name} updated`, "success");

        queryClient.invalidateQueries([`records-${record?.id}`]);
      },
    }
  );
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handle the creation of a new record. This function will be called when
   * the form is submitted. It will create a new record in the database and
   * invalidate the cache for the records query.
   * @param {AddRecordBody} data - The data to create the record with
   * @returns {Promise<void>}
   */
/******  55c58c92-55f7-4040-a076-bda09d0aa5f8  *******/
  const handleCreate = async (data: AddRecordBody) => {
    console.log("handleCreate")
    await createMutation.mutateAsync(data);
    // const result = await AddRecord(data);
    // if (result) {
    //   queryClient.invalidateQueries(`records`);
    // }
    createNotification({
      subject: `New record ${data?.name} has been created by ${DBDetails?.username}`,
      // content: "",
      to_farm_id: DBDetails?.farm_id as number,
    });
    setOpen(false);
  };

  const handleUpdate = async (data: AddRecordBody) => {
    updateMutation.mutate(data);
    createNotification({
      subject: `Record ${data?.name} has been updated by ${DBDetails?.username}`,
      // content: "",
      to_farm_id: DBDetails?.farm_id as number,
    });
    setOpen(false);
  };
  const handleSubmit = (values: any) => {
    // if (submitting) {
    //   return; // Prevent multiple submissions while processing
    // }

    // setSubmitting(true);
    values.farm_id = Number(DBDetails?.farm_id);
    values.dam = dam?.id;
    values.sire = sire?.id;
    values.gender = otherData?.gender;
    values.alive = otherData?.alive;
    values.category = otherData?.category
    values.remarks = otherData?.remarks;

    values.castrated = otherData?.castrated;

    !edit ? handleCreate(values) : handleUpdate(values);
  };

  return {
    handleSubmit,
    submitting,
  };
};

export default useRecordFormSubmission;
