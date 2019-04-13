
exports.initialize = (obj) => {
    
    t_numberOfIndividuals = obj.numberOfIndividuals || 5
    t_taxOfCrossover = obj.taxOfCrossover || 0.6
    t_taxOfMutation = obj.taxOfMutation || 0.2
    t_stack =  obj.maxStack || 3000
    t_lines =  obj.lines || 3
    t_collumn = obj.collumn || 3

    return {
        numberOfIndividuals: t_numberOfIndividuals,
        taxOfCrossover: t_taxOfCrossover,
        taxOfMutation: t_taxOfMutation,
        stack: t_stack,
        lines: t_lines,
        collumn: t_collumn
    }
    
}