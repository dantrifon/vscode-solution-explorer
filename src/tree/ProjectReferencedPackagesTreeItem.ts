import { TreeItem, TreeItemCollapsibleState } from "./TreeItem";
import { ContextValues } from "./ContextValues";
import { Project } from "../model/Projects";
import { ProjectReferencedPackageTreeItem } from "./ProjectReferencedPackageTreeItem";

export class ProjectReferencedPackagesTreeItem extends TreeItem {
    private children: TreeItem[] = null;

    constructor(private readonly project: Project, parent: TreeItem) {
        super("packages", TreeItemCollapsibleState.Collapsed, ContextValues.ProjectReferencedPackages, parent);
    }

    public getChildren(): Thenable<TreeItem[]> {
        if (this.children) {
            return Promise.resolve(this.children);
        }

        this.children = [];
        var refs = this.project.getPackageReferences();
        refs.sort((a, b) => {
            var x = a.Name.toLowerCase();
            var y = b.Name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        refs.forEach(ref => {
            this.children.push(new ProjectReferencedPackageTreeItem(ref, this));
        });

        return Promise.resolve(this.children);
    }

    public refresh(): void {
        this.children = null;
	}
}