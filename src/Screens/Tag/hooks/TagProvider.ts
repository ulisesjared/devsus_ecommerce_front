import { useMemo } from "react"
import useGeneric from "../../../common/hooks/Generic"
import type { Tag } from "../../../common/Interfaces/TagInterface"

const useTag = ({ id, enabled = true }: { id?: string, enabled?: boolean }={}) => {

    const {
        list: tags, listStatus: tagsStatus,
        retrieve: tag, retrieveStatus: tagStatus,
        create: createTag, createStatus: createTagStatus,
        update: updateTag, updateStatus: updateTagStatus,
        delete: deleteTag, deleteStatus: deleteTagStatus,
    } = useGeneric<Tag>({
        module: 'tag',
        listQueryKey: 'tags',
        retrieveQueryKey: 'tag',
        apiUrl: 'tag',
        redirectUrl: 'tag',
        objectId: id,
        enabled: enabled,
    })

    const TagsMap = useMemo(() => (
        Object.fromEntries(tags?.map(t => [t.id, t]) ?? [])
    ), [tags])

    return {
        tags, tagsStatus,
        tag, tagStatus,
        createTag, createTagStatus,
        updateTag, updateTagStatus,
        deleteTag, deleteTagStatus,
        TagsMap
    }
}

export default useTag