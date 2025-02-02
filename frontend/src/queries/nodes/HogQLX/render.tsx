import { JSONViewer } from 'lib/components/JSONViewer'
import { Sparkline } from 'lib/lemon-ui/Sparkline'

import { ErrorBoundary } from '~/layout/ErrorBoundary'

export function parseHogQLX(value: any): any {
    if (!Array.isArray(value)) {
        return value
    }
    if (value[0] === '__hx_tag') {
        const object: Record<string, any> = {}
        const start = value[1] === '__hx_obj' ? 2 : 0
        for (let i = start; i < value.length; i += 2) {
            const key = parseHogQLX(value[i])
            object[key] = parseHogQLX(value[i + 1])
        }
        return object
    }
    return value.map((v) => parseHogQLX(v))
}

export function renderHogQLX(value: any): JSX.Element {
    const object = parseHogQLX(value)

    if (typeof object === 'object') {
        if (Array.isArray(object)) {
            return <JSONViewer src={object} name={null} collapsed={object.length > 10 ? 0 : 1} />
        }

        const { __hx_tag: tag, ...rest } = object
        if (!tag) {
            return <JSONViewer src={rest} name={null} collapsed={Object.keys(rest).length > 10 ? 0 : 1} />
        } else if (tag === 'Sparkline') {
            return (
                <ErrorBoundary>
                    <Sparkline {...rest} data={rest.data ?? []} type={rest.type ?? []} />
                </ErrorBoundary>
            )
        }
        return <div>Unknown tag: {String(tag)}</div>
    }

    return <>{String(value)}</>
}
