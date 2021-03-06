YUI.add('template-react', function (Y) {

    var React = Y.config.global.React;

    React.revive = React.revive || function (component) {
        return function () {
            var instance = component();
            return function (data, node) {
                // mixing in the template data
                // TODO: why not instance.setProps()?
                Y.mix(instance.props, data, true);
                if (node) {
                    // supporting node and elements
                    React.renderComponent(instance, node._node || node);
                    return; // not need to return the html since the node was passed in
                }
                // fallback to return the html if node was not provided
                node = document.createDocumentFragment();
                React.renderComponent(instance, node);
                return node.innerHTML;
            };
        };
    };

    Y.React = React;

}, '', {requires: ['template-base']});
