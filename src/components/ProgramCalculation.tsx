/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */

"use client";

import { Calculator } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetProgramsQuery } from "store/api/programsApi";

import { Model } from "@/components/global";
import Chip from "@/components/global/Chip";
import { Table } from "@/components/global/ThemeTable/Table";
import Animate from "@/wrappper/Animate";
import TitleWrapper from "@/wrappper/TitleWrapper";

import DownloadUploadTemplate from "./components/TempateModel";

// Types for better type safety
interface ApiState {
  page: number;
  pageSize: number;
  sortOrder?: string;
  sortField?: string;
}

interface Program {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  tenantId?: {
    parentId?: string;
  };
}

interface TableRow {
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  status: boolean;
  _original: Program;
}

// Constants moved outside component to prevent recreation
const INITIAL_API_STATE: ApiState = {
  page: 1,
  pageSize: 10,
};

const EDIT_OPTIONS = [
  { label: "Completed", value: "Draft" },
  { label: "completed", value: "draft" },
] as const;

// Date formatter utility
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-CA");
};

function ProgramCalculation() {
  const { t } = useTranslation();
  const [apiState, setApiState] = useState<ApiState>(INITIAL_API_STATE);
  const [programId, setProgramId] = useState<string>("");
  const [isModelOpen, setModelOpen] = useState(false);

  // Query with proper typing
  const { data, isLoading } = useGetProgramsQuery(
    {
      page: apiState.page,
      limit: apiState.pageSize,
      sortOrder: apiState.sortOrder,
      sortType: apiState.sortField,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  // Memoized data extraction
  const { programs, totalCount, totalPages } = useMemo(() => {
    if (!data?.data) {
      return {
        programs: [],
        totalCount: 0,
        totalPages: 0,
      };
    }

    return {
      programs: data.data.programs || [],
      totalCount: data.data.pagination?.total || 0,
      totalPages: data.data.pagination?.pages || 0,
    };
  }, [data]);

  // Memoized table data transformation
  const calculationTableData = useMemo((): TableRow[] => {
    return programs.map((row: Program) => ({
      name: row.name,
      type: row?.tenantId?.parentId
        ? t("programs.programList.subsidiary")
        : t("programs.programList.primary"),
      startDate: formatDate(row.startDate),
      endDate: formatDate(row.endDate),
      status: row.isCompleted,
      _original: row,
    }));
  }, [programs, t]);

  // Memoized column configuration
  const columnConfig = useMemo(() => ({
    status: {
      label: "Status",
      sortable: true,
      editable: true,
      editType: "select" as const,
      editOptions: EDIT_OPTIONS,
      formatter: (value: any, row: TableRow) => {
        console.log("🚀 ~ ProgramList ~ value:", value);
        return (
          <Chip
            value={row._original?.isCompleted ? "completed" : "draft"}
            status={row._original?.isCompleted}
          />
        );
      },
    },
  }), []);

  // Memoized table actions
  const tableActions = useMemo(() => ({
    view: {
      enabled: true,
      onPress: (row: TableRow) => {
        setModelOpen(true);
        setProgramId(row._original._id);
      },
    },
  }), []);

  // Callback for API state changes
  const handleApiStateChange = useCallback((newState: ApiState) => {
    setApiState(newState);
  }, []);

  // Callback for closing modal
  const handleCloseModal = useCallback(() => {
    setModelOpen(false);
    setProgramId("");
  }, []);

  return (
    <>
      <Animate className="flex flex-col gap-10">
        <TitleWrapper
          title={t("programs.calculations.Program calculation")}
          icon={<Calculator />}
          hideButton="true"
          description={t("programs.calculations.list of all Program calculation")}
        />
        
        <div>
          <Table
            tableTitle="Programs Calculation"
            loading={isLoading}
            onApiStateChange={handleApiStateChange}
            pageSize={apiState.pageSize}
            data={calculationTableData}
            enablePagination
            apiControlled
            totalPages={totalPages}
            totalRows={totalCount}
            columnConfig={columnConfig}
            urlSync
            urlSyncOptions={{
              updateUrl: true,
            }}
            actions={tableActions}
          />
        </div>
      </Animate>

      <Model open={isModelOpen} setOpen={setModelOpen}>
        <DownloadUploadTemplate 
          programId={programId} 
          setModelOpen={handleCloseModal} 
        />
      </Model>
    </>
  );
}

export default ProgramCalculation;