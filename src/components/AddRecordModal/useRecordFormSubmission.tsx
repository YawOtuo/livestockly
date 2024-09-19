import { AddRecord, AddRecordBody, updateRecord } from "@/lib/api/record";
import useNotifications from "@/lib/hooks/useNotifications";
import useToast from "@/lib/hooks/useToasts";
import { RootState } from "@/lib/redux/store";
import { today } from "@/lib/utils/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  otherData: any;
  setOpen: any;
  type?: string;
  edit?: boolean;
  record?: any;
  dam?: any;
  sire?: any;
};

const useRecordFormSubmission = ({
  otherData,
  setOpen,
  type,
  edit,
  record,
  sire,
  dam,
}: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const userSqlData = useSelector((state : RootState) => state?.users?.userSqlData);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { createNotification } = useNotifications();
  const { showToast } = useToast();
  const createMutation = useMutation((newItem : AddRecordBody) => AddRecord(newItem), {
    onSuccess: () => {
      showToast(`New ${otherData.type || type} added`, "success");

      queryClient.invalidateQueries([`records`]);
    },
    onMutate: () => {
      showToast("Submitting", "success");
    },
  });
  const updateMutation = useMutation(
    (newItem : AddRecordBody) => updateRecord(record?.id, newItem),
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
  const handleCreate = async (data : AddRecordBody) => {
    await createMutation.mutateAsync(data);
    // const result = await AddRecord(data);
    // if (result) {
    //   queryClient.invalidateQueries(`records`);
    // }
    createNotification({
      subject: `New record ${data?.name} has been created by ${userSqlData?.username}`,
      // content: "",
      to_farm_id: userSqlData?.farm_id as number,
    });
    setOpen(false);
  };

  const handleUpdate = async (data :AddRecordBody) => {
    updateMutation.mutate(data);
    createNotification({
      subject: `Record ${data?.name} has been updated by ${userSqlData?.username}`,
      // content: "",
      to_farm_id: userSqlData?.farm_id as number,
    });
    setOpen(false);
  };
  const handleSubmit = (values : any) => {
    // if (submitting) {
    //   return; // Prevent multiple submissions while processing
    // }

    // setSubmitting(true);
    values.farm_id = Number(userSqlData?.farm_id);
    values.dam = dam?.id;
    values.sire = sire?.id;
    values.gender = otherData?.gender;
    values.alive = otherData?.alive;
    values.type =
      otherData?.type === "goat" ? "goats" : otherData?.type || type;
    values.remarks = otherData?.remarks;

    if (!edit) {
      values.weight = values?.weight && [
        { content: values?.weight, date: today },
      ];
      values.vaccination_info = values?.vaccination_info && [
        { content: values?.vaccination_info, date: today },
      ];
      values.health_condition = otherData?.health_condition && [
        { content: values?.health_condition, date: today },
      ];

      values.remarks = otherData?.remarks && [
        { content: otherData?.remarks, date: today },
      ];
    }

    values.castrated = otherData?.castrated;

    !edit ? handleCreate(values) : handleUpdate(values);
  };

  return {
    handleSubmit,
    submitting,
  };
};

export default useRecordFormSubmission;
